import { apiService } from './apiService';

const userService = {
  getUsers: async () => {
    const response = await apiService.get('/users');
    return response.data;
  },

  toggleBlockUser: async (userId, isActive) => {
    const response = await apiService.patch(`/users/${userId}/block/`, { is_active: !isActive });
    return response.data;
  },

  updateUserField: async (userId, field, value) => {
    const response = await apiService.patch(`/users/${userId}/`, { [field]: value });
    return response.data;
  }
};

export { userService };