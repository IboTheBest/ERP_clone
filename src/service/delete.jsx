import { instance } from "../hooks/instance"


export const deleteUser = (API, setIsLoading, setOpenModal, navigate, toast) => instance().delete(API).then(() => {
    setTimeout(() => {
        setIsLoading(false)
        setOpenModal(false)
        navigate(-1)
    }, 1000)
    setTimeout(() => toast.success("O'chirildi!"), 500)
}).catch(err => {
    setIsLoading(false)
    toast("Xatolik bor")
})