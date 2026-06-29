export async function apiRequest<T>(request: () => Promise<{ data: T }>): Promise<T> {
    try {
        const response = await request();
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Server error");
        }
    }
}