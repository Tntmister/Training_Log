/*
    1. Barbell
    2. Dumbbell
    3. Machine
    4. BodyWeight
    5. Cardio
    6. Endurance
*/

const categorie = {
    1 : 'barbell',
    2 : 'dumbbell',
    3 : 'machine',
    4 : 'bodyweight',
    5 : 'cardio',
    6 : 'endurance'
}

type ExtraContent = {
    images: Object,
    video: Object
}

// Component that can have multimedia content attached 

class MediaComponent{
    extraContent: ExtraContent 
    anotation = ''
    constructor(){
        this.extraContent = {images: [], video: []}
    }
}

 // Sets

class WESet extends MediaComponent{
    weight = 0
    repRange = [0,0]
    repsDone = 0
}

class DESet extends MediaComponent{
    wantedDuration = 0
    duration = 0
}

// Exercises
class Exercise extends MediaComponent{
    name:string
    id:number
    description:string
    categorie?: number
    restTime = '1:30'

    constructor(name: string, id: number, description: string){
        super()
        this.name        = name
        this.id          = id
        this.description = description
    }
}

export class WeightExercise extends Exercise{
    multiplier = 1
    sets: WESet[] = []

}

export class DurationExercise extends Exercise{
    sets: DESet[] = []
}

export class BarbellExercise extends WeightExercise{
    categorie = 1
}

export class DumbbellExercise extends WeightExercise{
    multiplier = 2
    categorie = 2
}

export class MachineExercise extends WeightExercise{
    categorie = 3
}

export class BodyWeightExercise extends WeightExercise{
    categorie  = 4
    assisted   = false
    assistance = 0
    weighted   = false
    weigth     = 0
}

export class CardioExercise extends DurationExercise{
    categorie = 5
}

export class EnduranceExercise extends DurationExercise{
    categorie = 6
}

// Training Session
export class TrainingSession{
    name: string
    description = ''
    exercises : Exercise[] = []
    done = false
    volume = 0
    time = ''
    date = getTimestamp()

    constructor(exercises: Exercise[], name: string){
        this.exercises = exercises
        this.name = name
    }
}

// Training Model
export class TrainingModel extends MediaComponent{
    name = 'New Training Model'
    author = ''
    description = ''
    exercises: Exercise[] = []
    
    public startSession(): TrainingSession {
        return new TrainingSession(this.exercises, this.name)
    }
}

// auxiliar
function getTimestamp(): string {
    const curdate = new Date()
    const day     = curdate.getDate() < 10 ? '0'+curdate.getDate() : curdate.getDate()
    const month   = curdate.getMonth() < 9 ? '0'+(curdate.getMonth()+1) : (curdate.getMonth()+1)
    const year    = curdate.getFullYear()
    const hours   = curdate.getHours() < 10 ? '0'+curdate.getHours() : curdate.getHours()
    const minutes = curdate.getMinutes() < 10 ? '0'+curdate.getMinutes() : curdate.getMinutes()
    const seconds = curdate.getSeconds() < 10 ? '0'+curdate.getSeconds() : curdate.getSeconds()
    const date = day     + "/"
               + month   + "/" 
               +  year   + " | "  
               + hours   + ":"  
               + minutes + ":" 
               + seconds 
    
    return date
}

//--------------------------------------------------------------------------------//
const model1 = new TrainingModel()

console.log(model1)

model1.author = 'Rafael Pardal'
model1.description = 'Upper Body Workout - From Upper-Lower Split'

console.log(model1)

const ex1 = new BarbellExercise('Bench Press', 1, 'Barbell Bench Press')
const ex2 = new BodyWeightExercise('Pull-Up', 2, 'Overhand grip Pull-Up')

model1.exercises.push(ex1)
model1.exercises.push(ex2)

//console.log('\n' + JSON.stringify(model1, null, 1))

const session1 = model1.startSession()

console.log('TRAINING SESSION \n', JSON.stringify(session1, null, 1))

console.log(new Date().getTime())