let name = 'pavel';
let name2 = 'ksu'
name = name2
name

let animal = {
  name: 'pavel',
  say() {
    console.log(this.name)
  }
}
animal.say()
let a = animal
a.name = 'ksu'
animal

function foo(a) {
  a.name = 'ivan'
}

foo(animal)
a