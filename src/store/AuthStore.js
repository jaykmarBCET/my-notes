import { create } from 'zustand';
import { InstanceAxios } from '../api/InstanceAxios';

const useAuthStore = create((set) => ({
    user: null,
    isLoading:false,
    login: async (data) => {
        try {
            set({isLoading:true})
            const response = await InstanceAxios.post('/api/login', data);
            if (response.data?.message) return;
            set({ user: response.data });
        } catch (error) {
            console.error("Login Error:", error?.response?.data?.message || error.message);
        }finally{
            set({isLoading:false})
        }
    },

    register: async (data) => {
        try {
            set({isLoading:true})
            const response = await InstanceAxios.post('/api/register', data);
            if (response.data?.message) return;
            set({ user: response.data });
        } catch (error) {
            console.error("Register Error:", error?.response?.data?.message || error.message);
        }finally{
            set({isLoading:false})
        }
    },

    current: async () => {
        try {
            set({isLoading:true})
            const response = await InstanceAxios.get('/api/current-user');
            if (response.data?.message) return;
            set({ user: response.data });
        } catch (error) {
            console.error("Current User Error:", error?.response?.data?.message || error.message);
        }finally{
            set({isLoading:false})
        }
    },

    logout: async () => {
        try {
            set({isLoading:true})
            const response = await InstanceAxios.get('/api/logout');
            if (response.status === 200) {
                set({ user: null });
            } else {
                console.error("Logout Error:", response.data.message);
            }
        } catch (error) {
            console.error("Logout Error:", error?.response?.data?.message || error.message);
        }finally{
            set({isLoading:false})
        }
    },
}));

export { useAuthStore };
