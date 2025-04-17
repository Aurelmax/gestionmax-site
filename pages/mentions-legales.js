import React from 'react';
import Link from 'next/link';

export default function LegalNotice() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-secondary-dark text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Mentions Légales</h1>
          </div>
        </div>
      </section>

      {/* Legal Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose lg:prose-lg">
            <h2>Informations légales</h2>
            <p>
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site Gestionmax les informations suivantes :
            </p>

            <h3>1. Informations légales :</h3>
            <p>
              Nom du site : Gestionmax<br />
              Adresse : www.gestionmax.fr<br />
              Propriétaire : Aurélien Lavayssière<br />
              Adresse : Antibes, Alpes-Maritimes (06)<br />
              Email : contact@gestionmax.fr<br />
              Téléphone : +33 4 00 00 00 00<br />
              SIRET : 483 797 213 000 61
            </p>

            <h3>2. Présentation et principe :</h3>
            <p>
              Est désigné ci-après : Utilisateur, tout internaute se connectant et utilisant le site susnommé. Le site Gestionmax regroupe un ensemble de services, dans l'état, mis à la disposition des utilisateurs. Il est ici précisé que ces derniers doivent rester courtois et faire preuve de bonne foi tant envers les autres utilisateurs qu'envers le webmaster du site Gestionmax.
            </p>

            <h3>3. Accessibilité :</h3>
            <p>
              Le site Gestionmax est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf interruption, programmée ou non, pour les besoins de sa maintenance ou en cas de force majeure. En cas d'impossibilité d'accès au service, Gestionmax s'engage à faire son maximum afin de rétablir l'accès au service et s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention.
            </p>

            <h3>4. Propriété intellectuelle :</h3>
            <p>
              Aurélien Lavayssière est propriétaire exclusif de tous les droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, tant sur la structure que sur les textes, images, graphismes, logo, icônes, sons, logiciels…
            </p>
            <p>
              Toute reproduction totale ou partielle du site Gestionmax, représentation, modification, publication, adaptation totale ou partielle de l'un quelconque de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'Aurélien Lavayssière, propriétaire du site à l'email : contact@gestionmax.fr, à défaut elle sera considérée comme constitutive d'une contrefaçon et passible de poursuite.
            </p>

            <h3>5. Liens hypertextes et cookies :</h3>
            <p>
              Le site Gestionmax contient un certain nombre de liens hypertextes vers d'autres sites (partenaires, informations …) mis en place avec l'autorisation d'Aurélien Lavayssière. Cependant, Aurélien Lavayssière n'a pas la possibilité de vérifier l'ensemble du contenu des sites ainsi visités et décline donc toute responsabilité de ce fait quant aux risques éventuels de contenus illicites.
            </p>
            <p>
              L'utilisateur est informé que lors de ses visites sur le site Gestionmax, un ou des cookies sont susceptibles de s'installer automatiquement sur son ordinateur par l'intermédiaire de son logiciel de navigation. Un cookie est un bloc de données qui ne permet pas d'identifier l'utilisateur, mais qui enregistre des informations relatives à la navigation de celui-ci sur le site.
            </p>

            <h3>6. Protection des biens et des personnes - gestion des données personnelles :</h3>
            <p>
              En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
            </p>
            <p>
              Sur le site Gestionmax, Aurélien Lavayssière ne collecte des informations personnelles (suivant l'article 4 loi n°78-17 du 06 janvier 1978) relatives à l'utilisateur que pour le besoin de certains services proposés par le site Gestionmax. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie.
            </p>
            <p>
              Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, tout utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles le concernant. Pour l'exercer, adressez votre demande à Gestionmax par email : contact@gestionmax.fr ou par écrit dûment signée, accompagnée d'une copie du titre d'identité avec signature du titulaire de la pièce, en précisant l'adresse à laquelle la réponse doit être envoyée.
            </p>

            <h3>7. Certification Qualiopi</h3>
            <p>
              Aurélien Lavayssière, exerçant sous le nom commercial Gestionmax, est certifié Qualiopi pour ses actions de formation. Cette certification qualité a été délivrée au titre de la catégorie suivante : actions de formation.
            </p>

            <h3>8. Loi applicable et juridiction compétente</h3>
            <p>
              Les présentes Mentions Légales sont régies par la loi française. En cas de litige, les tribunaux français seront seuls compétents.
            </p>

            <p className="text-sm text-gray-500 mt-12">
              Dernière mise à jour : 15 avril 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
