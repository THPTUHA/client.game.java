import dynamic from "next/dynamic"

// export const ReactQuillNoSSR = dynamic(
//     () => import("react-quill"),
//     { ssr: false }
// )

// import dynamic from "next/dynamic"

export const ReactQuillNoSSR = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
      },
      {
        ssr: false,
      }
)
