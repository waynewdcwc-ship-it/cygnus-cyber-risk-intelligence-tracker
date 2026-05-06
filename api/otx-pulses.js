export default async function handler(request, response) {
  const apiKey = process.env.OTX_API_KEY;

  if (!apiKey) {
    return response.status(200).json({
      ok: false,
      mode: 'fallback',
      message: 'OTX_API_KEY is not configured in this environment.',
      pulses: []
    });
  }

  try {
    const otxResponse = await fetch('https://otx.alienvault.com/api/v1/pulses/subscribed?limit=5', {
      headers: {
        'X-OTX-API-KEY': apiKey,
        Accept: 'application/json'
      }
    });

    if (!otxResponse.ok) {
      return response.status(200).json({
        ok: false,
        mode: 'fallback',
        message: `OTX responded with status ${otxResponse.status}. Static fallback remains active.`,
        pulses: []
      });
    }

    const data = await otxResponse.json();
    const results = Array.isArray(data.results) ? data.results : [];

    const pulses = results.slice(0, 5).map((pulse) => ({
      id: pulse.id,
      name: pulse.name || 'Unnamed OTX pulse',
      description: pulse.description ? String(pulse.description).slice(0, 220) : '',
      modified: pulse.modified || pulse.created || '',
      indicatorCount: Array.isArray(pulse.indicators) ? pulse.indicators.length : Number(pulse.indicator_count || 0)
    }));

    return response.status(200).json({
      ok: true,
      mode: 'live',
      message: 'OTX preview data loaded through the secure serverless route.',
      pulses
    });
  } catch (error) {
    return response.status(200).json({
      ok: false,
      mode: 'fallback',
      message: 'OTX request failed. Static fallback remains active.',
      pulses: []
    });
  }
}
