import { useCallback } from 'react';
import { setQuery, receiveFolder, receiveSaves } from '../query.slice';
import { useDispatch } from 'react-redux';
import { sendQuery, getfolder, getsaves } from '../service/query.api';

const useQuery = () => {
  const dispatch = useDispatch();

  const handleSendQuery = useCallback(async (query) => {
    dispatch(setQuery(query));
    try {
      const response = await sendQuery(query);
      console.log('Query sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending query:', error);
      throw error;
    }
  }, [dispatch]);

  const handleReceiveFolder = useCallback(async () => {
    try {
      const response = await getfolder();
      dispatch(receiveFolder(response));
      console.log('Folder received successfully:', response);
      return response;
    } catch (error) {
      console.error('Error receiving folder:', error);
      throw error;
    }
  }, [dispatch]);

  const handleReceiveSaves = useCallback(async (id) => {
    try {
      const response = await getsaves(id);
      dispatch(receiveSaves(response));
      console.log('Saves received successfully:', response);
      return response;
    } catch (error) {
      console.error('Error receiving saves:', error);
      throw error;
    }
  }, [dispatch]);

  return {
    handleSendQuery,
    handleReceiveFolder,
    handleReceiveSaves,
  };
};

export default useQuery;
