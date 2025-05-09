// Katas de Codificación para ISP (Principio de Segregación de Interfaces)
// A continuación, se presentan seis katas diseñadas para sobre Principio de Segregación de Interfaces (ISP). Cada kata incluye una breve descripción del problema, la necesidad de ISP y la refactorización esperada.

// Kata 1: Interfaz Monolítica
// Objetivo: Crear una interfaz monolítica que viole ISP.
// 1.- Crear una interfaz Animal con los métodos fly(), swim() y run().
interface Animal {
  fly(): void;
  swim(): void;
  run(): void;
}

// 2.- Implementar las clases Bird, Fish y Dog utilizando la interfaz Animal.

class Bird1 implements Animal {
  fly(): void {
    console.log("El pajaro vuela");
  }

  swim(): void {
    throw new Error("Un pajaro no puede nadar(es ilogico)");
  }

  run(): void {
    console.log("El pájaro corre");
  }
}
// 3.- Identificar el problema: No todos los animales pueden realizar todas las acciones.

// Las clases estan obligadas a implementar metodos que no les corresponden como por ejemplo que un pajaro vaya a nadar.
// Esto viola ISP porque las clases dependen de métodos que no usan.

// 4.- Refactorizar: Dividir Animal en interfaces más pequeñas (Flyable, Swimmable, Runnable) e implementar solo las relevantes en cada clase.

interface Flyable {
  fly(): void;
}

export interface Swimmable {
  swim(): void;
}

export interface Runnable {
  run(): void;
}

export class Bird2 implements Flyable, Runnable {
  fly(): void {
    console.log("El pajaro vuela(logico)");
  }

  run(): void {
    console.log("El pajaro corre");
  }
}

// Kata 2: Sistema Legacy con Métodos No Utilizados
// Objetivo: Identificar métodos no utilizados en un sistema legacy
// 1.- Crear una interfaz LegacyPrinter con los métodos print(), scan() y fax().
export interface LegacyPrinter {
  print(document: string): void;
  scan(document: string): void;
  fax(document: string): void;
}

// 2.- Implementar una clase BasicPrinter que solo utilice print().

export class BasicPrinter1 implements LegacyPrinter {
  print(document: string): void {
    console.log(`Imprimiendo documento: ${document}`);
  }

  scan(): void {
    throw new Error("Este tipo de impresora no puede escanear");
  }

  fax(): void {
    throw new Error("Este tipo de impresora no puede faxear");
  }
}
// 3.- Identificar el problema: BasicPrinter se ve obligada a implementar métodos no utilizados.
// - BasicPrinter solo puede imprimir, pero está forzada a implementar scan() y fax().
// - Se viola ISP, ya que esta clase depende de metodos que no necesita.
// - El código es fragil además de propenso a errores de ejecución si alguien llama a esos metodos que no se podrian ejecutar.

// 4.- Refactorizar: Dividir LegacyPrinter en Printable, Scannable y Faxable.

export interface Printable {
  print(document: string): void;
}

export interface Scannable {
  scan(document: string): void;
}

export interface Faxable {
  fax(document: string): void;
}

export class BasicPrinter2 implements Printable {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }
}

export class AdvancedPrinter implements Printable, Scannable, Faxable {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

  scan(document: string): void {
    console.log(`Escaneando: ${document}`);
  }

  fax(document: string): void {
    console.log(`Enviando fax: ${document}`);
  }
}

// Kata 3: Operaciones No Soportadas
// Objetivo: Manejar operaciones no soportadas.
// 1.- Crear una interfaz Vehicle con los métodos drive(), fly() y sail().
export interface Vehicle {
  drive(): void;
  fly(): void;
  sail(): void;
}

// 2.- Implementar las clases Car, Plane y Boat. Lanzar UnsupportedOperationException para los métodos no soportados.
export class Car1 implements Vehicle {
  drive(): void {
    console.log("El auto está conduciendo...");
  }

  fly(): void {
    throw new Error("Operacion no soportada: el auto no puede volar");
  }

  sail(): void {
    throw new Error("Operacion no soportada: el auto no puede navegar");
  }
}

export class Plane implements Vehicle {
  drive(): void {
    throw new Error("Un avion no puede conducir como un auto(es ilogico)");
  }

  fly(): void {
    console.log("El avión está volando");
  }

  sail(): void {
    throw new Error("El avión no puede navegar(super ilogico)");
  }
}

export class Boat implements Vehicle {
  drive(): void {
    throw new Error("El barco no puede conducir(ilogico)");
  }

  fly(): void {
    throw new Error("El barco no puede volar(ilogico)");
  }

  sail(): void {
    console.log("El barco está navegando");
  }
}

// 3.- Identificar el problema: Lanzar excepciones viola ISP.

// - Las clases están obligadas a implementar métodos que no son relevantes o importantes para su comportamiento.
// - Llenar con throw new Error() es una señal clara de que se está violando ISP.

// 4.- Refactorizar: Crear interfaces separadas (Drivable, Flyable, Sailable) e implementarlas adecuadamente.
// interfaces.ts
interface Drivable1 {
  drive(): void;
}

interface Flyable1 {
  fly(): void;
}

interface Sailable1 {
  sail(): void;
}

export class Car implements Drivable1 {
  drive(): void {
    console.log("El auto está conduciendo");
  }
}

export class Plane1 implements Flyable1 {
  fly(): void {
    console.log("El avión está volando");
  }
}

export class Boat1 implements Sailable1 {
  sail(): void {
    console.log("El barco está navegando");
  }
}

// Kata 4: Gestión de Sensores en un Sistema de Monitoreo
// Objetivo: Diseñar interfaces específicas para diferentes tipos de sensores.

// 1.- Crear una interfaz Sensor con los métodos readTemperature(), readPressure() y readHumidity().

export interface Sensor {
  readTemperature(): number;
  readPressure(): number;
  readHumidity(): number;
}

// 2.- Implementar las clases TemperatureSensor, PressureSensor y HumiditySensor.

export class TemperatureSensor1 implements Sensor {
  readTemperature(): number {
    return 22.5; // Valor simulado
  }

  readPressure(): number {
    throw new Error("Este sensor no mide presión(no compartible)");
  }

  readHumidity(): number {
    throw new Error("Este sensor no mide humedad(no compartible)");
  }
}

export class PressureSensor1 implements Sensor {
  readTemperature(): number {
    throw new Error("Este sensor no mide temperatura(ilogico)");
  }

  readPressure(): number {
    return 1013.25;
  }

  readHumidity(): number {
    throw new Error("Este sensor no mide humedad(ilogico)");
  }
}

export class HumiditySensor1 implements Sensor {
  readTemperature(): number {
    throw new Error("Este sensor no mide temperatura no es compartible");
  }

  readPressure(): number {
    throw new Error("Este sensor no mide presión no es compartible");
  }

  readHumidity(): number {
    return 45.0;
  }
}

// 3.- Identificar el problema: Cada sensor implementa métodos que no necesita.

// - Cada clase implementa métodos que no tienen sentido para su tipo de sensor.

// - Las implementaciones lanzan errores, lo que genera riesgo de fallos en tiempo de ejecución.

// 4.- Refactorizar: Dividir Sensor en interfaces más pequeñas (TemperatureReadable, PressureReadable, HumidityReadable) e implementar solo las relevantes en cada clase.

export interface TemperatureReadable {
  readTemperature(): number;
}

export interface PressureReadable {
  readPressure(): number;
}

export interface HumidityReadable {
  readHumidity(): number;
}

export class TemperatureSensor2 implements TemperatureReadable {
  readTemperature(): number {
    return 22.5;
  }
}

export class PressureSensor2 implements PressureReadable {
  readPressure(): number {
    return 1013.25;
  }
}

export class HumiditySensor2 implements HumidityReadable {
  readHumidity(): number {
    return 45.0;
  }
}

// Kata 5: Interfaz de Dispositivo IoT
// Objetivo: Diseñar interfaces para capacidades específicas de dispositivos.
// 1.- Crear una interfaz SmartDevice con los métodos turnOn(), turnOff(), connectToWiFi() y playMusic().

export interface SmartDevice {
  turnOn(): void;
  turnOff(): void;
  connectToWiFi(ssid: string, password: string): void;
  playMusic(song: string): void;
}

// 2.- Implementar las clases SmartLight y SmartSpeaker.

export class SmartLight1 implements SmartDevice {
  turnOn(): void {
    console.log("Luz encendida");
  }

  turnOff(): void {
    console.log("Luz apagada");
  }

  connectToWiFi(ssid: string, password: string): void {
    console.log(`Conectando luz a red WiFi ${ssid}`);
  }

  playMusic(song: string): void {
    throw new Error("Las luces inteligentes no reproducen música");
  }
}

export class SmartSpeaker1 implements SmartDevice {
  turnOn(): void {
    console.log("Altavoz encendido");
  }

  turnOff(): void {
    console.log("Altavoz apagado");
  }

  connectToWiFi(ssid: string, password: string): void {
    console.log(`Conectando altavoz a red WiFi ${ssid}`);
  }

  playMusic(song: string): void {
    console.log(`Reproduciendo: ${song}`);
  }
}

// Identificar el problema: SmartLight no necesita playMusic().

// - SmartLight se ve forzado a implementar playMusic(), una función que no tiene sentido.

// - Esto viola ISP, porque una clase no debería estar obligada a depender de métodos que no usa.

// Refactorizar: Crear interfaces más pequeñas (PowerControllable, WiFiConnectable, MusicPlayable) e implementarlas selectivamente.

export interface PowerControllable {
  turnOn(): void;
  turnOff(): void;
}

export interface WiFiConnectable {
  connectToWiFi(ssid: string, password: string): void;
}

export interface MusicPlayable {
  playMusic(song: string): void;
}

export class SmartLight2 implements PowerControllable, WiFiConnectable {
  turnOn(): void {
    console.log("Luz encendida");
  }

  turnOff(): void {
    console.log("Luz apagada");
  }

  connectToWiFi(ssid: string, password: string): void {
    console.log(`Luz conectada a WiFi: ${ssid}`);
  }
}

export class SmartSpeaker2
  implements PowerControllable, WiFiConnectable, MusicPlayable
{
  turnOn(): void {
    console.log("Altavoz encendido");
  }

  turnOff(): void {
    console.log("Altavoz apagado");
  }

  connectToWiFi(ssid: string, password: string): void {
    console.log(`Altavoz conectado a WiFi: ${ssid}`);
  }

  playMusic(song: string): void {
    console.log(`Reproduciendo: ${song}`);
  }
}

// Kata 6: Sistema de Pago en E-Commerce
// Objetivo: Evitar que las clases implementen métodos irrelevantes.

// 1.- Crear una interfaz PaymentProcessor con los métodos processCreditCard(), processPayPal() y processCrypto().
export interface PaymentProcessor {
  processCreditCard(amount: number): void;
  processPayPal(amount: number): void;
  processCrypto(amount: number): void;
}
// 2.- Implementar las clases CreditCardProcessor, PayPalProcessor y CryptoProcessor.

export class CreditCardProcessor1 implements PaymentProcessor {
  processCreditCard(amount: number): void {
    console.log(`Procesando pago con tarjeta de crédito: $${amount}`);
  }

  processPayPal(amount: number): void {
    throw new Error("Este procesador no maneja PayPal");
  }

  processCrypto(amount: number): void {
    throw new Error("Este procesador no maneja criptomonedas");
  }
}

export class PayPalProcessor1 implements PaymentProcessor {
  processCreditCard(amount: number): void {
    throw new Error("Este procesador no maneja tarjetas");
  }

  processPayPal(amount: number): void {
    console.log(`Procesando pago con PayPal: $${amount}`);
  }

  processCrypto(amount: number): void {
    throw new Error("Este procesador no maneja criptomonedas");
  }
}

export class CryptoProcessor1 implements PaymentProcessor {
  processCreditCard(amount: number): void {
    throw new Error("No soporta tarjetas");
  }

  processPayPal(amount: number): void {
    throw new Error("No soporta PayPal");
  }

  processCrypto(amount: number): void {
    console.log(`Procesando con Cripto: $${amount}`);
  }
}

// 3.- Identificar el problema: Cada clase implementa métodos que no utiliza.

// - Cada clase implementa métodos que no usa.

// - Se lanzan errores artificiales que rompen el principio de sustitución de Liskov y el ISP.

// 4.- Refactorizar: Dividir PaymentProcessor en CreditCardPayment, PayPalPayment y CryptoPayment.
export interface CreditCardPayment {
  processCreditCard(amount: number): void;
}

export interface PayPalPayment {
  processPayPal(amount: number): void;
}

export interface CryptoPayment {
  processCrypto(amount: number): void;
}

export class CreditCardProcessor2 implements CreditCardPayment {
  processCreditCard(amount: number): void {
    console.log(`💳 Pago con tarjeta: $${amount}`);
  }
}

export class PayPalProcessor2 implements PayPalPayment {
  processPayPal(amount: number): void {
    console.log(`💻 Pago con PayPal: $${amount}`);
  }
}

export class CryptoProcessor2 implements CryptoPayment {
  processCrypto(amount: number): void {
    console.log(`🪙 Pago con Criptomonedas: $${amount}`);
  }
}
