export const thousandSeparator = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const abbreviate = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const getDateTimeArrayIndo = dateTimeString => {
  const dateTime = new Date(dateTimeString);
  const day = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const date = `${day[dateTime.getDay()]}, ${dateTime.getDate()} ${
    months[dateTime.getMonth()]
    } ${dateTime.getFullYear()}`;
  const time = dateTime
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    })
    .toLowerCase();
  return [date, time];
};