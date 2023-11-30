export default {
    template: `

<div>
    <div>
        Create Product
    </div>
    <div >


<div class="horiz">
    <div>
        Product Name:
    </div>
    <div>
        <input type="text" name="title" id="title" v-model="prod_name" />
    </div>
</div>
<div class="horiz">
    <div>
        Product Section Id:
    </div>
    <div>
        <input type="int" name="sec_id" id="sec_id" v-model="prod_sec_id" />
    </div>
</div>
<div class="horiz">
    <div>
        Product Description:
    </div>
    <div>
        <input type="text" name="desc" id="desc"  v-model="prod_desc" />
    </div>
</div>
<div class="horiz">
    <div>
        Current Stock:
    </div>
    <div>
        <input type="int" name="stock" id="stock" v-model="prod_stock" />
    </div>
</div>
<div class="horiz">
    <div>
        In Stock?
    </div>
    <div>
        <input type="checkbox" name="in_stock" id="in_stock" v-model="prod_in_stock" />
    </div>
</div>
<div class="horiz">
    <div>
        Product Price:
    </div>
    <div>
        <input type="int" name="price" id="price" v-model="prod_price" />
    </div>
</div>
<div class="horiz">
    <div>
        Per Unit:
    </div>
    <div>
        <input type="text" name="unit" id="unit" v-model="prod_unit" />
    </div>
</div>
<div class="horiz">
    <div>
        Manufacturing Date:
    </div>
    <div>
        <input type="date" name="mfg_date" id="mfg_date" v-model="prod_mfg_date" />
    </div>
</div>
<div class="horiz">
    <div>
        Expiry Date:
    </div>
    <div>
        <input type="date" name="exp_date" id="exp_date" v-model="prod_exp_date" />
    </div>
</div>
<div class="horiz">
    <div>
        <button @click="createProduct">Create Product</button>
    </div>

</div>

        </div>

    </div>
</div>

    `,
    data(){
        return {
            prod_name: '',
            prod_sec_id: '',
            prod_desc: '',
            prod_stock: '',
            prod_in_stock: '',
            prod_price: '',
            prod_unit: '',
            prod_mfg_date: '',
            prod_exp_date: '',
            product_image:'NOTHING',
        }
    },
    mounted(){

    },
    created(){

    },
    methods:{
        async createProduct(){

            const prod_url = 'api/newproduct'
            console.log("prod_url")
            const prod_data = {
                "product_name": this.prod_name,
                "section_id": this.prod_sec_id,
                "product_desc": this.prod_desc,
                "curr_stock": this.prod_stock,
                "in_stock": Boolean(this.prod_in_stock),
                "product_price": this.prod_price,
                "per_what": this.prod_unit,
                "product_image": this.product_image,
                "mfg_date": this.prod_mfg_date,
                "exp_date": this.prod_exp_date,
                "creation_date": new Date(),
            }
            console.log(prod_data)
            const res= await fetch(prod_url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                body: JSON.stringify(prod_data),
            })
            if(res.ok){
                const dataa=await res.json();
                console.log(dataa)
                if (dataa.message == null){
                    console.log("product created")
                    this.$router.push({name: 'smhome'})
                }
            }
        }
    }
}