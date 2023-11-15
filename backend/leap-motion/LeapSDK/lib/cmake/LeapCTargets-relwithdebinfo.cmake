#----------------------------------------------------------------
# Generated CMake target import file for configuration "RelWithDebInfo".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "LeapSDK::LeapC" for configuration "RelWithDebInfo"
set_property(TARGET LeapSDK::LeapC APPEND PROPERTY IMPORTED_CONFIGURATIONS RELWITHDEBINFO)
set_target_properties(LeapSDK::LeapC PROPERTIES
  IMPORTED_LOCATION_RELWITHDEBINFO "${_IMPORT_PREFIX}/Ultraleap Hand Tracking Service.app/Contents/LeapSDK/lib/libLeapC.5.dylib"
  IMPORTED_SONAME_RELWITHDEBINFO "@rpath/libLeapC.5.dylib"
  )

list(APPEND _cmake_import_check_targets LeapSDK::LeapC )
list(APPEND _cmake_import_check_files_for_LeapSDK::LeapC "${_IMPORT_PREFIX}/Ultraleap Hand Tracking Service.app/Contents/LeapSDK/lib/libLeapC.5.dylib" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
