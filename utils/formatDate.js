// Export this helper function to format the date - could be included in another js file but this makes it a little cleaner and easier to follow
module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      console.log(date)
      return date.toLocaleDateString();
    },
  };
  