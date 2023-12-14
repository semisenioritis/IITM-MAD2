export default {
    template: `
    <div class="container mt-5">
    <div class="card bg-dark text-white">
        <div class="card-header text-center">
            Modify Product
        </div>
        <div class="card-body centerer">

            <div class="form-group row limit_row_width">
                <label for="title" class="col-sm-3 col-form-label">Product Name:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="title" name="title" v-model="prod_name" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="sec_id" class="col-sm-3 col-form-label">Product Section Id:</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="sec_id" name="sec_id" v-model="prod_sec_id" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="desc" class="col-sm-3 col-form-label">Product Description:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="desc" name="desc" v-model="prod_desc" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="stock" class="col-sm-3 col-form-label">Current Stock:</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="stock" name="stock" v-model="prod_stock" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="in_stock" class="col-sm-3 col-form-label">In Stock?</label>
                <div class="col-sm-10">
                    <input type="checkbox" class="form-check-input" id="in_stock" name="in_stock" v-model="prod_in_stock" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="price" class="col-sm-3 col-form-label">Product Price:</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="price" name="price" v-model="prod_price" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="unit" class="col-sm-3 col-form-label">Per Unit:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="unit" name="unit" v-model="prod_unit" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="mfg_date" class="col-sm-3 col-form-label">Manufacturing Date:</label>
                <div class="col-sm-10">
                    <input type="date" class="form-control" id="mfg_date" name="mfg_date" v-model="prod_mfg_date" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <label for="exp_date" class="col-sm-3 col-form-label">Expiry Date:</label>
                <div class="col-sm-10">
                    <input type="date" class="form-control" id="exp_date" name="exp_date" v-model="prod_exp_date" />
                </div>
            </div>

            <div class="form-group row limit_row_width">
                <div class="col-sm-12">
                    <button class="btn btn-primary" @click="modifyprod">Modify Product</button>
                </div>
            </div>

        </div>
    </div>
</div>

    `,
    data(){
        return {
            prod_id: this.$route.query.itemId,
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
        this.fetch_product_details()
    },    
    methods:{
        async fetch_product_details(){
            console.log("testing")
            const prod_url = '/api/product/' + this.prod_id
            const res = await fetch(prod_url,{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },

            })
            if(res.ok){
                const dataa = await res.json()
                console.log(dataa)

                if (dataa.message == null){
                    console.log("product created")
                    this.prod_name = dataa.product_name
                    this.prod_sec_id = dataa.section_id
                    this.prod_desc = dataa.product_desc
                    this.prod_stock = dataa.curr_stock
                    this.prod_in_stock = dataa.in_stock
                    this.prod_price = dataa.product_price
                    this.prod_unit = dataa.per_what
                    this.prod_mfg_date = dataa.mfg_date
                    this.prod_exp_date = dataa.exp_date
                    this.product_image = dataa.product_image
                }

            }
        },
        async modifyprod(){
            const prod_url = '/api/product_update/' + this.prod_id
            const data_to_send = {
                "product_name": this.prod_name,
                "section_id": this.prod_sec_id,
                "product_desc": this.prod_desc,
                "curr_stock": this.prod_stock,
                "in_stock": this.prod_in_stock,
                "product_price": this.prod_price,
                "per_what": this.prod_unit,
                "mfg_date": this.prod_mfg_date,
                "exp_date": this.prod_exp_date,
                "product_image": this.product_image,
            }
            console.log(data_to_send)
            const res = await fetch(prod_url,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("Authentication-Token"),
                },
                body: JSON.stringify(data_to_send)
            })
            if(res.ok){
                const dataa = await res.json()
                console.log(dataa)
                if (dataa.message == null){
                    console.log("product modified")
                    this.$router.push({name: 'smhome'})
                }



            }
        }
        

    }
}