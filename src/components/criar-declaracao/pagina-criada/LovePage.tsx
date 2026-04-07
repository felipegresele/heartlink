import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function LovePage() {

  const { slug } = useParams()
  const [page, setPage] = useState(null)

  useEffect(() => {

    axios.get(`http://localhost:8080/api/love-pages/${slug}`)
      .then(res => {
        setPage(res.data)
      })
      .catch(err => {
        console.error(err)
      })

  }, [slug])

  if (!page) return <h1>Carregando...</h1>

  return (
    <div>

      <h1>{page.receiverName}</h1>
      <h2>De: {page.senderName}</h2>

      <p>{page.message}</p>

      {page.photos?.map((photo, index) => (
        <img key={index} src={photo} width="300"/>
      ))}

    </div>
  )
}