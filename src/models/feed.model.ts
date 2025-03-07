import { IFeed } from "./feed.interface";

export class Feed implements IFeed {
    id: string;
    titulo: string;
    descripcion: string;
    url: string;
    fuente: string;
    fecha: Date;
    categoria: "politica" | "deportes" | "tecnologia" | "economia" | "otros";
    imagen?: string;
    destacada: boolean;
  
    constructor(
      id: string,
      titulo: string,
      descripcion: string,
      url: string,
      fuente: string,
      fecha: Date,
      categoria: "politica" | "deportes" | "tecnologia" | "economia" | "otros",
      imagen: string | undefined,
      destacada: boolean
    ) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.url = url;
      this.fuente = fuente;
      this.fecha = fecha;
      this.categoria = categoria;
      this.imagen = imagen;
      this.destacada = destacada;
    }

  }
  