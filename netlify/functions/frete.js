exports.handler = async (event) => {
  const { cep } = JSON.parse(event.body);

  const response = await fetch('https://melhorenvio.com.br/api/v2/me/shipment/calculate', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.MELHOR_ENVIO_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'queridavalent@gmail.com'
    },
    body: JSON.stringify({
      from: { postal_code: '01415002' },
      to: { postal_code: cep },
      products: [{
        id: '1',
        width: 15,
        height: 5,
        length: 20,
        weight: 0.3,
        insurance_value: 30,
        quantity: 1
      }]
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };
};
