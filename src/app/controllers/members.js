const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render("members/index", { members })
    },
    
    create(req, res) {
        return res.render("members/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill all required fields")
            }
        }
    },
    
    show(req, res) {
        const { id } = req.params
    
        const foundmember = data.members.find(function(member){
            return member.id == id
        })
        if(!foundmember) return res.send("member not found")
        
        const member = {
            ...foundmember,
            age: age(foundmember.birth),
            services: foundmember.services.split(","),
            created_at: new intl.DateTimeFormat("pt-BR").format(foundmember.created_at)
        }
    
        return res.render("members/show", { member })
    },
    
    edit(req, res) {
        const { id } = req.params
    
        const foundmember = data.members.find(function(member){
            return member.id == id
        })
        if(!foundmember) return res.send("member not found")
    
        const member = {
            ...foundmember,
            birth: date(foundmember.birth).iso
            
        }
    
        return res.render('members/edit', { member })
    },
    
    put(req, res) {
        const { id } = req.body
        let index = 0
    
        const foundmember = data.members.find(function(member, foundIndex) {
            if(id == member.id) {
                index = foundIndex
            }
        })
    },
    
    delete(req, res) {
        const { id } = req.body
    
        const filteredmembers = data.members.filter(function(member) {
            return member.id != id
        })
        data.members = filteredmembers
    }
}