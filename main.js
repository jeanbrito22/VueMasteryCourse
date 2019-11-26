Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Number,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <a :href="google"><img :src="image"></a>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div class="color-box" 
                :style="{ backgroundColor: variant.variantColor, display: 'inline-block', marginRight: '5px' }" 
                v-for="(variant, index) in variants" :key="variant.variantId"
                @mouseover="updateProduct(index)">
            </div>

            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <button @click="addToCart(inStock)" :class="{ disabledButton: !inStock }">Add to Cart</button>
            <button class="redBtn" @click="removeFromCart" :disabled="!cart">Remove from Cart</button>

        </div>
    </div>
    `,
    data() { 
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            google: '#',
            sizes: ['P', 'M', 'G'],
            cart: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './assets/vmSocks-green.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './assets/vmSocks-blue.jpg',
                    variantQuantity: 0
                }
            ],
        }
    },
    methods: {
        addToCart(inStock) {
            let regularStock = inStock < 0 ? 0 : inStock;
            return this.$emit('add-to-cart', regularStock)
        },
        removeFromCart: function() {
            return this.$emit('remove-from-cart');
        },

        updateProduct: function(index) {
            return this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            return this.premium ? "Free" : 2.99
        }
    }

})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: 0
    },
    methods: {
        addToCart(inStock) {
            return this.cart < inStock ? this.cart += 1 : this.cart;
        },
        removeFromCart() {
            return this.cart ? this.cart -= 1: this.cart;
        }
    }
})