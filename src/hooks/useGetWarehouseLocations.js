import { WAREHOUSE_LOCATIONS_API } from '../constants/api';
import axios from '../constants/axios';

const useGetWarehouseLocations = () => {
    const getWarehouseLocations = () => {
        axios.get(WAREHOUSE_LOCATIONS_API).then((locations) => {
            console.log(locations);
        }).catch(e => console.log(e))
    }

    return { getWarehouseLocations };
};

export default useGetWarehouseLocations;
