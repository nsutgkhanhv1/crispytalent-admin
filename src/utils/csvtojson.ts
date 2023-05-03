function csvJSON(csv) {
  try {
    const lines = csv.split('/l');

    const result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      if (lines[i] !== '') {
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
          obj['created_at'] = new Date();
          obj['updated_at'] = new Date();
        }

        result.push(obj);
      }
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  } catch (error) {
    console.log(error);
  }
}

export default csvJSON;
