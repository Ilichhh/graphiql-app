import { useAppDispatch, useAppSelector } from './reduxTypedHooks';
import { setEndpoint } from '../store/endpointSlice';

export const useEndpointState = () => {
  const tabId = useAppSelector(({ tabs: { selectedId } }) => selectedId);
  const endpoints = useAppSelector((store) => store.endpoint);
  const dispatch = useAppDispatch();

  return {
    endpoint: endpoints[tabId],
    setEndpoint: (endpoint: string) => dispatch(setEndpoint({ tabId, endpoint })),
  };
};
