import React, { useEffect, useState } from 'react';
import StockArrow from '../../Assets/StockArrow';
import './StockInfo.scss';

function StockInfo(props: any) {

    console.log("CCCCCCCC", props.companyInfoAV);
    const [companyInfoTD, setCompanyInfoTD] = useState({values: [{close: 1, high: 1, low: 1},{close: 1, high: 1, low: 1}], meta: {currency: 0}});
    const [companyInfoAV, setCompanyInfoAV] = useState<CompanyInfoAV>();
    const [recentPercentage, setRecentPercentage] = useState<number>(0);

    type CompanyInfoAV = {
        "52WeekHigh": "",
        "52WeekLow": ""
    }

    useEffect(() => {
        setCompanyInfoTD(props.companyInfoTD);
        setCompanyInfoAV(props.companyInfoAV);
        companyInfoTD && calculatePercentage(companyInfoTD.values[0].close, companyInfoTD.values[1].close);
    }, [])

    function calculatePercentage(value1: number, value2: number){
        let percentage = (value1 - value2) / value2 * 100;
        setRecentPercentage(parseFloat(percentage.toFixed(2)));
    }

  return (
      //to be done
        <div className='stock-info'>
              <div className="current-stock">
              <StockArrow className={ recentPercentage >= 0 ? "stock-arrow positive" : "stock-arrow negative" }/>
              <p className="current-stock-text">{companyInfoTD ? Number(companyInfoTD.values[0].close).toFixed(2) : "..."} {companyInfoTD.meta.currency}</p>
              <p className={ recentPercentage >= 0 ? "percentage positive" : "percentage negative" } >{recentPercentage}%</p>
              </div>
              <div className='info-line'>
                  <p>Today's high: </p> <p>{companyInfoTD ? Number(companyInfoTD.values[0].high).toFixed(2) : "..."} {companyInfoTD.meta.currency}</p>
              </div>
              <div className='info-line'>
                  <p>Today's low:</p> <p>{companyInfoTD ? Number(companyInfoTD.values[0].low).toFixed(2)  : "..."} {companyInfoTD.meta.currency}</p>
              </div>
              <div className='info-line'>
                  <p>52wk high: </p> <p>{companyInfoAV ? companyInfoAV["52WeekHigh"] : "..."} {companyInfoTD.meta.currency}</p>
              </div>
              <div className='info-line'>
                  <p>52wk low: </p> <p>{companyInfoAV ? companyInfoAV["52WeekLow"] : "..."} {companyInfoTD.meta.currency}</p>
              </div>
        </div>
  );
}

export default StockInfo;
