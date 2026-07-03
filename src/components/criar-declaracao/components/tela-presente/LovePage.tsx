import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import type { LovePageData } from "../../../../schema/schemas";
import PageReady from "./template-padrao/page-ready-template-padrao";
import { mapBackendRetrospectiva } from "../../../../schema/retrospectiva";
import PageReadySpotify from "./template-padrao/page-ready-template-spotify";

export default function LovePage() {
  const { slug } = useParams();

  const [page, setPage] = useState<LovePageData | null>(null);

  useEffect(() => {
    axios
      .get(`https://lovepage-backend.onrender.com/api/love-pages/${slug}`)
      .then((res) => {
        setPage(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [slug]);

  if (!page) return <h1>Carregando...</h1>;

  const TemplateComponent =
    page.pageTemplate === "SPOTIFY" ? PageReadySpotify : PageReady;

  return (
    <TemplateComponent
      titulo={page.receiverName}
      mensagem={page.message}
      imagens={page.photos}
      musicaId={page.musicId}
      musicaTitulo={page.musicTitle}
      dataConhecimento={page.relationshipStartDate}
      usuarioNome={page.senderName}
      tipoPresenteado={page.tipoPresenteado}
      retrospectiva={
        page.retrospectiva
          ? mapBackendRetrospectiva(page.retrospectiva)
          : undefined
      }
    />
  );
}