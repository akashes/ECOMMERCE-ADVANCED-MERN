export function loadPaypalScript(clientId) {
  return new Promise((resolve, reject) => {
    // avoid reloading if already present
    if (document.getElementById("paypal-sdk")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&disable-funding=card&intent=capture&debug=true`;
    script.id = "paypal-sdk";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
}