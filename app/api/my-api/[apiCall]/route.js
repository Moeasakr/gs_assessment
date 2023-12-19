export const GET = async (request, { params }) => {
    try {
        const route = `https://marketdata.tradermade.com/api/v1/timeseries?api_key=${process.env.API_KEY}&${params.apiCall}`;
        const response = await fetch(route);
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response("Internal server error", {status: 500});
    }
}