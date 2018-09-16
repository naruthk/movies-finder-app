module.exports = {
  shortenLargeNumber: function(num, digits) {
    /**
     * Converts currency into readable values like 1M, 1B, etc.
     * For example, 1000000 becomes 1M
     * Source: https://stackoverflow.com/a/28608086
     */
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;
    for (var i = units.length - 1; i >= 0; i--) {
      decimal = Math.pow(1000, i + 1);
      if (num <= -decimal || num >= decimal) {
          return +(num / decimal).toFixed(digits) + units[i];
      }
    }
    return num;
  }
}