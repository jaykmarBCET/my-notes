import { InstanceAxios } from '../api/InstanceAxios';
import { create } from 'zustand';

const useSubjectStore = create((set) => ({
    subject: null,
    content: null,
    isLoading: false,

    setLoading: (value) => set({ isLoading: value }),

    createSubject: async (data) => {
        set({ isLoading: true });
    
        try {
            const response = await InstanceAxios.post('/api/subject', data, {
                params: { id: data.id }, // Correctly passing query params
            });
    
            if (response.data.message) return;
    
            set((state) => ({
                subject: [...(state.subject || []), response.data],
            }));
        } catch (error) {
            console.error("Create Subject Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },
    

    updateSubject: async (data) => {
        set({ isLoading: true });
        try {
            const { id, name } = data;
            const response = await InstanceAxios.put('/api/subject', { name }, { params: { id } });
            if (response.data.message) return;
            set((state) => ({
                subject: (state.subject || []).map((item) =>
                    item._id === id ? response.data : item
                ),
            }));
        } catch (error) {
            console.error("Update Subject Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    getSubject: async () => {
        set({ isLoading: true });
        try {
            const response = await InstanceAxios.get('/api/subject');
            if (response.data.message) return;
            set({ subject: response.data });
        } catch (error) {
            console.error("Get Subject Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteSubject: async (data) => {
       
        set({ isLoading: true });
        try {
            const response = await InstanceAxios.delete('/api/subject', { params: { id: data.id } });
            if (response.data.message) return;
            set((state) => ({
                subject: (state.subject || []).filter((item) => item._id !== data.id),
            }));
        } catch (error) {
            console.error("Delete Subject Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    createContent: async (data) => {
        set({ isLoading: true });
        try {
            const response = await InstanceAxios.post("/api/content", data);
            if (response.data.message) return;
            set((state) => ({ content: [...(state.content || []), response.data] }));
        } catch (error) {
            console.error("Create Content Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    updateContent: async (data) => {
        set({ isLoading: true });
        try {
            const response = await InstanceAxios.put('/api/content', data, { params: { contentId: data.id } });
            if (response.data.message) return;
            set((state) => ({
                content: (state.content || []).map((item) =>
                    item._id === data.id ? response.data : item
                ),
            }));
        } catch (error) {
            console.error("Update Content Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    getContent: async (data) => {
        set({ isLoading: true });
        try {
            const response = await InstanceAxios.get('/api/content', { params: { id: data.id } });
            if (response.data.message) return;
            set({ content: response.data });
        } catch (error) {
            console.error("Get Content Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteContent: async (data) => {
        set({ isLoading: true });
        try {
            const response = await InstanceAxios.delete("/api/content", { params: { contentId: data.id } });
            if (response.status !== 200) return;
            set((state) => ({
                content: (state.content || []).filter((item) => item._id !== data.id),
            }));
        } catch (error) {
            console.error("Delete Content Error:", error?.response?.data?.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    }

}));

export { useSubjectStore };
