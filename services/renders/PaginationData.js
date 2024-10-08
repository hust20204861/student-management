import { getPagination } from "../../api/fetchAPI";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PaginationData = (url1, url, type, search, contentId, contentType ) => {
    const [data, setData] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [end, setEnd] = useState(false)
    const [preData, setPreData] = useState([]);

  const params = new URLSearchParams();
  const params1 = new URLSearchParams();
  let key = `data${url1}`;
  if (type) {
    params.append('type', type); 
    params1.append('type', type); 
    key += `/${type}`;
  }
  if (search) {
    params.append('search', search);
    params1.append('search', search);
  }
  if (contentId) {
    params.append('content_id', contentId);
    params1.append('content_id', contentId);
  }
  if (contentType) {
    params.append('content_type', contentType);
    params1.append('content_type', contentType);
  }
  if (currentPage) {
    params.append('page', currentPage + 1);
  }
  params1.append('page', 1); 

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  if (params1.toString()) {
    url1 += `?${params1.toString()}`; 
  }
    const fetchData = async () => {
      setRefreshing(true);
      try {
        const response = await getPagination(url1);
        await AsyncStorage.setItem(key, JSON.stringify(response.data.data));
        setTotalPage(response.data.last_page); 
        setCurrentPage(response.data.current_page);
        setData( response.data.data);
      } catch (error) {
        console.log("Failed to get data:", error);
      } finally {
        setRefreshing(false);
      }
  };
    const nextData = async() => {
      try{
      const datapagi = await getPagination(url);
      const pageData = datapagi.data.data
      setPreData(pageData)
      const initLoadingState = {};
      pageData.forEach(item => { initLoadingState[item.Id] = true });
        setLoadingStates(initLoadingState);
      pageData.forEach(item => {
          setLoadingStates(prevLoadingStates => ({ ...prevLoadingStates, [item.Id]: false }));
        });
      } catch (error) {
        console.log("Failed to get data:", error);
      }
    }
        useEffect(() => {
          fetchData();
        },[]);
        useEffect(() => {
          fetchData();
          nextData()
        },[search])
        useEffect(() => {
          nextData();
        }, [currentPage]);

      const loadMore = () => {
        if (currentPage < totalPage) {
          setCurrentPage(prev => prev + 1)  
          setData(prev => {
            const allData = prev.concat(preData);
            return allData
          })
        }
        if (currentPage == totalPage){
        setEnd(true);
        }
      };
      return { data, loadingStates, refreshing, loadMore, end, fetchData };
}
  
  
  