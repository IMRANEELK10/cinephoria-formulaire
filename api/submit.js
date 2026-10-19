export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return res.status(500).json({
      error: 'GOOGLE_SCRIPT_URL environment variable is not configured on Vercel.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = Object.fromEntries(new URLSearchParams(body));
      }
    }
    body = body || {};

    // Prepare URL-encoded form data as expected by Google Apps Script doPost(e.parameter)
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      redirect: 'follow',
    });

    const text = await response.text();

    if (!response.ok && response.status >= 400) {
      return res.status(response.status).json({
        error: `Google Apps Script returned status ${response.status}`,
        details: text,
      });
    }

    return res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      error: 'Failed to forward application to Google Sheets',
      details: error.message,
    });
  }
}
