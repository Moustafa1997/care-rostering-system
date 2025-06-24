import type { Metadata } from "next";

/**
 * @usage
 * export const metadata = withMetadata({
 *  title: 'My Title'
 * });
 */
export function withMetadata(metadata: Metadata): Metadata {
  return metadata;
}

/**
 * @usage
 * type Props = {
 *  params: { productId: string; }
 * }
 *
 * export const generateMetadata = withGenerateMetadata<Props>(async(props, parent) => {
 *   const productName = await getProductName(props.params.productId);
 *   return {
 *     title: productName
 *   };
 * })
 */
