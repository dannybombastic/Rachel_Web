

export class Retiros {



    constructor(
        public key:string,
        public title: string,
        public instructor: string,
        public date: string,
        public location: string,
        public precio: string[],
        public content: string,
        public fotos: Array<string>,
        public descripcion: string[],
        public fotos_dos: Array<string>,
        public pie_carousel:string,
        public paquetes: Array<any>,
        public fotos_tres: Array<string>,
        public testimonios: string[],
      
        public inst: Array<any>

 



    ) {

    }

}