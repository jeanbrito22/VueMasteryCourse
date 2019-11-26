var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        image: './assets/vmSocks-green.jpg',
        google: '#',
        quantity: 0,
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue.jpg'
            }
        ],
        sizes: ['P', 'M', 'G'],
        cart: 0,
    },
    methods: {
        addToCart() {
            return this.inStock ? this.cart += 1: this.cart;
        },
        removeFromCart: function() {
            return this.cart ? this.cart -= 1: this.cart;
        },

        updateProduct: function(variantImage) {
            this.image = variantImage
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        }
    }
})