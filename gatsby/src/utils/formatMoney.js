const formatter = Intl.NumberFormat('lt', {
  style: 'currency',
  currency: 'EUR',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
