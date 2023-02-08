import { $fileUpload } from './http/http'

export const getPrettyDateAndTime = (data) => {
  const dataArr = data.split('T')
  const date = dataArr[0]
  const time = dataArr[1]
  const prettyDate = monthConverter(date)
  const cutTime = time.slice(0, 5)
  return prettyDate + ', в ' + cutTime
}

export const createFormData = (files) => {
  const formData = new FormData()

  for (let i = 0; i < files.length; i++) {
    if (files[i]) {
      formData.append('files', files[i])
    }
  }
  return formData
}

export const monthConverter = (date) => {
  const months = {
    '01': 'Января',
    '02': 'Февраля',
    '03': 'Марта',
    '04': 'Апреля',
    '05': 'Мая',
    '06': 'Июня',
    '07': 'Июля',
    '08': 'Августа',
    '09': 'Сентября',
    10: 'Октября',
    11: 'Ноября',
    12: 'Декабря'
  }
  const yyyymmdd = date.split('-')
  yyyymmdd[1] = months[yyyymmdd[1]]
  yyyymmdd.reverse()
  return yyyymmdd.join(' ')
}

export const putImageToAdv = async (id, file, dispatch, setAdvImages) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await $fileUpload.post(`/ads/${id}/image`, formData)
  const imagesUrls = response.data.images.map((el) => el.url)
  while (imagesUrls.length < 5) imagesUrls.push('')
  while (imagesUrls.length > 5) imagesUrls.pop()
  dispatch(setAdvImages(imagesUrls))
}
