import { useEffect, useState } from "react";
import { data } from "../dataset/data";
import moment from "moment";
const usePointCalculations = () => {
  const [finalData, setFinaldata] = useState([]);
  const calcPoints = () => {
    data.map((item) => {
      let points = 0;
      item.month = moment(new Date(item.tnx_dt)).format("MMMM");
      //console.log(item);
      if (item.amount > 100) {
        points += (item.amount - 100) * 2;
      }
      if (item.amount > 50) {
        // points += item.amount - 50;
        points += 50;
      }
      item.points = points;

      return item;
    });
    const groupByNameArray = groupByName(data);
    // const groupByName = data.reduce((r, { name, ...object }) => {
    //   var temp = r.find((o) => o.name === name);
    //   if (!temp) r.push((temp = { name, transactions: [] }));
    //   temp.transactions.push(object);
    //   return r;
    // }, []);
    // console.log(groupByName);
    const groupByMonth = getGroupByMonth(groupByNameArray);

    return groupByMonth;
  };
  const groupByName = (data) => {
    return data.reduce((r, { name, ...object }) => {
      var temp = r.find((o) => o.name === name);
      if (!temp) r.push((temp = { name, transactions: [] }));
      temp.transactions.push(object);
      return r;
    }, []);
  };
  const getGroupByMonth = (groupByNameArray) => {
    return groupByNameArray.map((item) => {
      const groupByMonth = item.transactions.reduce(
        (r, { month, ...object }) => {
          //console.log("r", r);
          var temp = r.find((o) => o.month === month);
          if (!temp)
            r.push(
              (temp = {
                totalPoints: 0,
                totalAmount: 0,
                month,
                monthsArray: []
              })
            );
          temp.totalAmount += object.amount;
          temp.totalPoints += object.points;
          temp.monthsArray.push(object);
          return r;
        },
        []
      );
      item.transactions = groupByMonth;

      return item;
    });
  };
  useEffect(() => {
    const resultData = calcPoints();
    setFinaldata(resultData);
  }, []);

  return finalData;
};

export default usePointCalculations;
