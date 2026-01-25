'use server'

export async function getISTHour() {
  const now = new Date();

  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();

  // IST = UTC + 5:30
  let istHour = utcHour + 5;
  if (utcMinute >= 30) istHour += 1;

  return istHour % 24;
}