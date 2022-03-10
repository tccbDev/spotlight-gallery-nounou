/**
 * @property {string[]} gallery
 * @property {string} url
 */
class LightBox {

    static init() {


        const link = Array.from(document.querySelectorAll('a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"]'));
            const gallery = link.map(link=>link.getAttribute('href'))

            link.forEach(link => link.addEventListener('click', e => {
                e.preventDefault()
                console.log('LINKS'+link);
                new LightBox(e.currentTarget.getAttribute('href'),gallery)
            }))
    }

    /**
     *
     * @param url
     * @param gallery
     */
    constructor(url,gallery) {

        this.element = this.buildDOM(url)
        this.gallery = gallery
        this.loadImage(url);
        document.body.appendChild(this.element)
    }

    buildDOM(url) {
        this.pageLoading();
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox__close"></button>
                        <button class="lightbox__next"></button>
                         <button class="lightbox__prev"></button>
                         <div class="lightbox__container">
                         
                        </div>`
        dom.querySelector(".lightbox__close").addEventListener('click',this.close.bind(this));
        dom.querySelector(".lightbox__next").addEventListener('click',this.next.bind(this));
        dom.querySelector(".lightbox__prev").addEventListener('click',this.prev.bind(this));
        return dom
    }

    /**
     *
     * @param e {MouseEvent} ferme la lightbox
     */
    close(e){
        e.preventDefault();
        this.element.classList.add('.fadeOut');
        window.setTimeout(()=>{
            this.element.remove();
        },500)

    }
    next(e){
        e.preventDefault();

        let image = this.gallery.findIndex(image => image === this.url);
        this.loadImage(this.gallery[image +1]);
    }

    prev(e){
        e.preventDefault();
        let image = this.gallery.findIndex(image => image === this.url);
        this.loadImage(this.gallery[image -1]);
    }

    loadImage(url){
        this.url = null;
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container')

        const loader = document.createElement('div');
        loader.classList.add('loader');
        container.innerHTML = '';
        container.appendChild(loader);
        image.onload =  ()=>{
            console.log('chargé');
            container.removeChild(loader);
            container.appendChild(image);
        }
        image.src = url;
        this.url = url;
    }

      pageLoading(){
        let pageLoader = document.createElement('div');
        pageLoader.classList.add('loading_page');

        document.body.appendChild(pageLoader);


        window.onload = ()=>{
            window.onload = function(){ document.querySelector(".loading_page").style.display = "none" }

        }
    }




}

/**
 * <div class="lightbox">
 <button class="lightbox__close"></button>
 <button class="lightbox__next"></button>
 <button class="lightbox__prev"></button>
 <div class="lightbox__container">
 <img src="https://picsum.photos/id/237/900/1800
 " alt="">
 </div>
 </div>
 */
LightBox.init();