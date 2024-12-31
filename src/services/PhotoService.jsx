class PhotoService {
    getPhotos() {
        return new Promise((resolve) => {
            import('./Data').then((module) => {
                resolve(module.data)
            })
        })
    }
}
export default new PhotoService();