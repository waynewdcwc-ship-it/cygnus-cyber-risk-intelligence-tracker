const FEED_URL = 'https://www.ncsc.gov.uk/api/1/services/v1/report-rss-feed.xml';

function decodeXml(value = '') {
  return String(value)
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(value = '') {
  return decodeXml(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeXml(match[1]).trim() : '';
}

function parseFeed(xml) {
  const itemMatches = String(xml).match(/<item[\s\S]*?<\/item>/gi) || [];

  return itemMatches.slice(0, 6).map((item) => {
    const title = stripHtml(extractTag(item, 'title')) || 'Untitled NCSC item';
    const link = stripHtml(extractTag(item, 'link'));
    const description = stripHtml(extractTag(item, 'description'));
    const pubDateRaw = stripHtml(extractTag(item, 'pubDate'));

    let pubDate = pubDateRaw;
    if (pubDateRaw) {
      const parsed = new Date(pubDateRaw);
      if (!Number.isNaN(parsed.getTime())) {
        pubDate = parsed.toISOString().slice(0, 10);
      }
    }

    return {
      title,
      link,
      summary: description ? description.slice(0, 260) : '',
      pubDate,
      source: 'NCSC Reports & Advisories'
    };
  });
}

export default async function handler(request, response) {
  try {
    const ncscResponse = await fetch(FEED_URL, {
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml'
      }
    });

    if (!ncscResponse.ok) {
      return response.status(200).json({
        ok: false,
        mode: 'fallback',
        message: `NCSC RSS responded with status ${ncscResponse.status}. Static guidance remains active.`,
        items: []
      });
    }

    const xml = await ncscResponse.text();
    const items = parseFeed(xml);

    return response.status(200).json({
      ok: true,
      mode: 'live',
      message: 'NCSC RSS feed loaded through the serverless route.',
      feedUrl: FEED_URL,
      items
    });
  } catch (error) {
    return response.status(200).json({
      ok: false,
      mode: 'fallback',
      message: 'NCSC RSS request failed. Static guidance remains active.',
      items: []
    });
  }
}
