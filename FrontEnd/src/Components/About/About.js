import './About.css';



const About = () => {
  return (
    <div className="container-main">
      <h1 className='text-main'>Quiénes Somos</h1>
    

      <div className='container-mission-vision'>
        <div className="container-card">
          <h2 className="text-card">Misión</h2>
          <p className="text-card-desc">Nuestro Liceo pertenece al circuito 01 de la dirección regional de educación de Sarapiquí,
            es una dependencia que integra el ministerio de educación pública, fundamentado en la política
            educativa vigente, promueve una educación de calidad en cuanto a la formación integral de los
            ciudadanos responsables, activos, críticos, participativos y con conciencia social, a fin de formar
            personas que se integren exitosamente a la sociedad.
          </p>
        </div>

        <div className="container-card">
          <h2 className='text-card'>Visión</h2>
          <p className="text-card-desc">Un Liceo orientado a lograr la excelencia de los procesos educativos contribuyendo al mejoraramiento
            sociocultural de Sarapiquí con una formación educativa de calidad, formando seres humanos integrales
            conscientes de su realidad, de sus deberes y obligaciones así como de sus derechos como persona y miembros
            de una sociedad.
          </p>
        </div>
        <div className="container-card">
          <h2 className='text-card'>Historia</h2>
          <p className="text-card-desc">El Liceo La Virgen se fundó en el año 1996 por motivo que varios pueblos
           pertenecientes al distrito de La Virgen, no tenía de forma cercana un centro educativo para seguir con 
           la educación a nivel de tercer ciclo, entonces el distrito cabecera con diferentes representantes de la 
           comunidad se organizaron para iniciar diferentes trámites y así lograr con diferentes jerarcas del ministerio,
            crear el Liceo La Virgen, el cual primeramente se localizaba a 150 metros sur este de la Clínica de La Virgen. 
          </p>
        </div>
      </div>

    </div>
  )
}

export default About