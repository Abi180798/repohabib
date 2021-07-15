export const thousandSeparator = value =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");

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
  