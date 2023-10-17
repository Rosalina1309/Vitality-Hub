export interface Loggable {
  id: string,
  name?: string,
  type?: string,
  muscle?: string,
  equipment?: string,
  difficulty?: string,
  instructions?: string,
  title?: string,
  image?: string,
  calories?: string,
  protein?: string,
  fat?: string,
  carbs?: string

}


export interface HealthLog {
  loggable: Loggable;
}