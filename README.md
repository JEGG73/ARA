# ARA (Asistente Robótico Agrícola)
ARA es una plataforma web modular diseñada bajo una arquitectura
Cliente-Servidor separada. El backend opera como una API RESTful
desarrollada en Laravel 11, encargada de la ingesta segura de datos de
telemetría (Nitrógeno, Fósforo, Potasio, Conductividad Eléctrica y pH) y
el almacenamiento relacional en MySQL. El frontend está construido con
React, proyectado como una Aplicación Web Progresiva (PWA) para
garantizar el acceso en zonas con baja conectividad, ofreciendo tableros
de visualización de datos en tiempo real. La principal innovación técnica
es su interoperabilidad con un microservicio de Inteligencia Artificial
independiente, el cual procesa el histórico de datos para generar modelos
predictivos y alimenta un asistente virtual (interfaz de chat) capaz de
responder consultas en lenguaje natural sobre el estado del suelo.