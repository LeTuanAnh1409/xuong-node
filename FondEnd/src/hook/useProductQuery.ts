import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProductQuery = (userId: string) => {
    return useQuery({
        queryKey: ["cart", userId],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:3000/cart/${userId}`);
                return response.data;
            } catch (error) {
                throw new Error("Error fetching product data");
            }
        }
    });
}

export default useProductQuery;
