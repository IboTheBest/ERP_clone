import { instance } from "../hooks/instance"

export const Create = (data, API, setIsLoading, navigate, toast) => instance().post(API, data).then(() => {
    setTimeout(() => {
        setIsLoading(false)
        navigate(-1)
      },1000)
      setTimeout(() => toast.success("Qo'shildi"), 500)
})

export const Edit = (data, API, setIsLoading, navigate, toast) => instance().put(API, data).then(() => {
  setTimeout(() => {
      setIsLoading(false)
      navigate(-1)
    },1000)
    setTimeout(() => toast.success("O'zgartirildi"), 500)
})