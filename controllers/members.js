const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')
const intl = require('intl')

exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
}

exports.create = function(req, res) {
    return res.render("members/create")
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if(!foundMember) return res.send("Member not found")
    
    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })
    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth),
        
    }

    return res.render('members/edit', { member })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please fill all required fields")
        }
    }

    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if(lastMember) {
        id = lastMember.id + 1
    } 

    data.members.push({
        id,
        birth,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })
    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("member not found.")

        return res.redirect("/members")
    })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if(id == member.id) {
            index = foundIndex
        }
    })


    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error")

        return res.redirect(`/members/${member.id}`)
    })
}