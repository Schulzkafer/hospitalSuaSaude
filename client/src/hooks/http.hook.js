import { useCallback, useState } from "react";


const useHttp = () => {

   const [isLoading, setIsLoading] = useState(false);

   const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true)
      try {
         if (body !== null) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json'
         }
         const response = await fetch(url, {
            method, body, headers
         })

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || "There is some problem")
         }
         setIsLoading(false)
         return data;

      } catch (e) {
         setIsLoading(false)
      }

   }, [])

   return { request, isLoading }

}

export default useHttp;