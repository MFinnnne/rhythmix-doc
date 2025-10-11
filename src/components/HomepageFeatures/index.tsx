import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.features.easyToUse.title',
      message: 'Easy to Use',
      description: 'The title of the Easy to Use feature',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate
        id="homepage.features.easyToUse.description"
        description="The description of the Easy to Use feature">
        Rhythmix was designed from the ground up to be easily integrated and
        used to process stream data with simple expressions.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'homepage.features.focusOnWhatMatters.title',
      message: 'Focus on What Matters',
      description: 'The title of the Focus on What Matters feature',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate
        id="homepage.features.focusOnWhatMatters.description"
        description="The description of the Focus on What Matters feature">
        Rhythmix lets you focus on your business logic. Write simple expressions
        instead of complex code to handle stream data processing.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'homepage.features.poweredByJava.title',
      message: 'Powered by Java',
      description: 'The title of the Powered by Java feature',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate
        id="homepage.features.poweredByJava.description"
        description="The description of the Powered by Java feature">
        Built with Java for high performance and reliability. Easily extend
        with custom filters, calculators, and meet functions.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img"  />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
