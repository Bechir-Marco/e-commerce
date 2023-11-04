import AnalyticsPageComponent from './components/AnalyticsPageComponent';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const fetchOrdersForFirstDate = async (firstDateToCompare:any) => {
  try {
    const { data } = await axios.get(
      '/api/orders/analysis/' + firstDateToCompare
    );
    return data;
  } catch (e:any) { 
    console.log(e.response.data.message ? e.response.data.message : e.response.data);
  }
};

const fetchOrdersForSecondDate = async ( secondDateToCompare:any) => {
  try {
    const { data } = await axios.get(
      '/api/orders/analysis/' + secondDateToCompare
    );
    return data;
  } catch (e: any) { 
    console.log(e.response.data.message ? e.response.data.message : e.response.data);
  }
};

const AdminAnalyticsPage = () => {
  return (
    <AnalyticsPageComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
      socketIOClient={socketIOClient}
    />
  );
};

export default AdminAnalyticsPage;
