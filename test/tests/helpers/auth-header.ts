export function getAuthHeaders() {
    return {
        Authorization: `Bearer $S{userAt}`
    };
}

export function getExistingUserAuthHeaders() {
    return {
        Authorization: `Bearer $S{existingUserAt}`
    };
}